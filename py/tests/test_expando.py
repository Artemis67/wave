# Copyright 2020 H2O.ai, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from h2o_wave import Expando, expando_to_dict, clone_expando, copy_expando


def test_expando_empty():
    e = Expando()
    d = expando_to_dict(e)
    assert len(d) == 0


def test_expando_create():
    e = Expando(dict(answer=42))
    assert e.answer == 42
    assert e['answer'] == 42
    assert 'answer' in e

    d = expando_to_dict(e)
    assert len(d) == 1
    assert d['answer'] == 42


def test_expando_dict_write():
    e = Expando(dict(answer=42))
    d = expando_to_dict(e)
    d['answer'] = 43
    assert e['answer'] == 43


def test_expando_item_write():
    e = Expando()
    assert e.answer is None
    assert e['answer'] is None
    assert 'answer' not in e
    e['answer'] = 42
    assert e.answer == 42
    assert e['answer'] == 42
    assert 'answer' in e


def test_expando_attr_write():
    e = Expando()
    assert e.answer is None
    assert e['answer'] is None
    assert 'answer' not in e
    e.answer = 42
    assert e.answer == 42
    assert e['answer'] == 42
    assert 'answer' in e


def test_expando_item_del():
    e = Expando(dict(answer=42))
    assert e.answer == 42
    assert e['answer'] == 42
    assert 'answer' in e
    del e['answer']
    assert e.answer is None
    assert e['answer'] is None
    assert 'answer' not in e


def test_expando_attr_del():
    e = Expando(dict(answer=42))
    assert e.answer == 42
    assert e['answer'] == 42
    assert 'answer' in e
    del e.answer
    assert e.answer is None
    assert e['answer'] is None
    assert 'answer' not in e


def test_expando_clone():
    e = clone_expando(Expando(dict(answer=42)))
    assert e.answer == 42
    assert e['answer'] == 42
    assert 'answer' in e


def test_expando_copy():
    e = copy_expando(Expando(dict(answer=42)), Expando())
    assert e.answer == 42
    assert e['answer'] == 42
    assert 'answer' in e


def test_expando_clone_exclude_keys():
    e = clone_expando(Expando(dict(a=1, b=2, c=3)), exclude_keys=['a'])
    assert 'a' not in e
    assert 'b' in e
    assert 'c' in e


def test_expando_clone_include_keys():
    e = clone_expando(Expando(dict(a=1, b=2, c=3)), include_keys=['a', 'b'])
    assert 'a' in e
    assert 'b' in e
    assert 'c' not in e


def test_expando_clone_include_exclued_keys():
    e = clone_expando(Expando(dict(a=1, b=2, c=3)), include_keys=['a', 'b'], exclude_keys=['b', 'c'])
    assert 'a' in e
    assert 'b' not in e
    assert 'c' not in e
